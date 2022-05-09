class CreateExtracts < ActiveRecord::Migration[7.0]
  def change
    create_table :extracts do |t|
      t.bigint :law_number
      t.string :qualification
      t.string :applicant_first_name
      t.string :applicant_last_name
      t.text :description
      t.string :suspect
      t.string :authority
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
