Rails.application.routes.draw do
  post 'refresh', controller: :refresh, action: :create
  post 'signin', controller: :signin, action: :create
  delete 'signin', controller: :signin, action: :destroy

  get 'me', controller: :users, action: :me
  put 'avatar', controller: :users, action: :update_avatar

  namespace :admin do
    resources :users, only: %i[index create update destroy]
  end
end
