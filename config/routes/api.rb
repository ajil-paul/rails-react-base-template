# frozen_string_literal: true

namespace :api, defaults: { format: :json } do
  namespace :v1 do
    resource :session, only: %i[create destroy]
    resources :users, only: %i[index] do
      post :register, on: :collection
      post :validate_otp, on: :collection
      post :resend_otp, on: :collection
      put :update_profile, on: :collection
    end
    resources :roles, only: %i[index]
  end
end
