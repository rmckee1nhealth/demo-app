import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Comments extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.string('post_id');
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('post_id');
    })
  }
}
