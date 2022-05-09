class Admin::ExtractsController < ApplicationController
  before_action :authorize_access_request!
  before_action :set_extract, only: [:show]
  ROLES = %w[admin].freeze

  def index
    # TODO: refactor query and json object
    @extracts = Extract.eager_load(:user).select('extracts.* , users.*')

    render json: @extracts
  end

  def show
    render json: @extract
  end

  def create
    @user = User.find(params[:extract][:user_id])
    @extract = @user.extracts.build(extract_params)
    @extract.save!
    render json: @extract, status: :created, location: @extract
  end

  private

  def set_extract
    @extract = current_user.extracs.find(params[:id])
  end

  def extract_params
    params.require('extract').permit(:law_number, :qualification, :applicant_first_name,
                                     :applicant_last_name, :description, :authority, :user_id)
  end
end
