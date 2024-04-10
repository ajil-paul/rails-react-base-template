# frozen_string_literal: true

namespace :api, defaults: { format: :json } do
  namespace :v1 do
    resource :session, only: %i[create destroy]
    resources :users, only: %i[create] do
      post :validate_otp, on: :collection
      post :resend_otp, on: :collection
      put :update, on: :collection
    end
  end
end
