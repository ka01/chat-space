class Api::MessagesController < ApplicationController
  def index
    # @group = group.find(params[:group_id])
    @message = @group.messages.includes(:user).where('id > ?', params[:last_id])
  end
end
