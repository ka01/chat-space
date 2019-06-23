class Group < ApplicationRecord
  has_many :users, through: :group_users
  has_many :group_users
  validates :name, presence: true, uniqueness: true
end
