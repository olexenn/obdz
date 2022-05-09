class UsersController < ApplicationController
  before_action :authorize_access_request!

  def me
    render json: current_user, methods: [:avatar_url]
  end

  def update_avatar
    @user = User.find(params[:id])
    if @user.update_attribute(:avatar, params[:avatar])
      render json: :ok
    else
      render json: { error: @user.errors.full_messages.join(' ') }, status: :unprocessable_entity
    end
  end
end
