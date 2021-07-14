import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Comments extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.string('body');
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('body');
    })
  }
}
