class Admin::UsersController < ApplicationController
  before_action :authorize_access_request!
  ROLES = %w[admin].freeze

  def index
    @users = User.where(role: 'user')

    render json: @users, methods: [:avatar_url]
  end

  def create
    @user = User.new(user_params)
    puts @user.username
    if @user.save
      render json: @user, status: :created, methods: [:avatar_url]
    else
      render json: { error: @user.errors.full_messages.join(' ') }, status: :unprocessable_entity
    end
  end

  def update
    puts params
    @user = User.find(params[:id])
    if @user.update(user_params)
      render json: @user, methods: [:avatar_url]
    else
      render json: { error: @user.errors.full_messages.join(' ') }, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy

    render json: :ok
  end

  def token_claims
    {
      aud: ROLES,
      verify_aud: true
    }
  end

  private

  def user_params
    params.require('user').permit(:id, :username, :first_name, :last_name, :password, :password_confirmation)
  end
end
