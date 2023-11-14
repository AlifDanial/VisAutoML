#
import sqlite3
conn = sqlite3.connect('db.sqlite3')
with sqlite3.connect("db.sqlite3") as db:
    c = db.cursor()
    sql_update_query = """delete from machine_learning_model"""
    c.execute(sql_update_query)
    db.commit()

    sql_update_query = """delete from machine_learning_modeldiscription"""
    c.execute(sql_update_query)
    db.commit()
