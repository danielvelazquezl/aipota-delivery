module OrdersHelper
  def get_status_color(status_order)
    status = %w(in_process received canceled)
    colors = %w(success warning danger)
    case status_order
    when status.first
      colors.first
    when status.second
      colors.second
    when status.third
      colors.third
    else
      colors.fourth
    end
  end
end
