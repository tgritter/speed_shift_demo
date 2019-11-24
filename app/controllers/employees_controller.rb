class EmployeesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    employees = Employee.order("created_at DESC")
    render json: employees
  end

  def create
    employee = Employee.create(employee_param)
    render json: employee
  end

  def update
    employee = Employee.find(params[:id])
    employee.update_attributes(employee_param)
    render json: employee
  end

  def destroy
    employee = Employee.find(params[:id])
    employee.destroy 
    head :no_content, status: :ok
  end

  private 
    def employee_param 
      params.require(:employee).permit(:name, :position, :email, :phone_number, :salary, :date_hired)
    end
end
