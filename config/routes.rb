Rails.application.routes.draw do
  root 'pages#index'
  scope '/api/v1' do
    resources :employees
  end
end
