class SignupController < ApplicationController
  before_action :authorize_access_request!, only: [:create]

  def create
    user = User.new(user_params)
    if user.save
      payload = { user_id: user.id, aud: [user.role] }
      session = JWTSessions::Session.new(payload:,
                                         refresh_by_access_allowed: true,
                                         namespace: "user_#{user.id}")
      tokens = session.login

      response.set_cookie(JWTSessions.access_cookie,
                          value: tokens[:access],
                          httponly: true,
                          secure: Rails.env.production?)
      render json: { csrf: tokens[:csrf] }
    else
      render json: { error: user.errors.full_messages.join(' ') }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:username, :first_name, :last_name, :password, :password_confirmation)
  end
end
