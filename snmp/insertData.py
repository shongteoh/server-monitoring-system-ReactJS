from ast import Delete
import schedule
import time


from getData import systemData, processData, memoryData, cpuData, networkData, diskData, batteryData, notificationData
from sqlite3 import connect
from venv import create
import psycopg2


hostname = 'localhost'
database = 'test'
username = 'postgres'
pwd = '0822'
port_id = 5432


def importData():
    result_system = systemData()
    result_process = processData()
    result_memory = memoryData()
    result_cpu = cpuData()
    result_network = networkData()
    result_disk = diskData()
    result_battery = batteryData()
    result_notification = notificationData()
   

    try:
        conn = psycopg2.connect(
            host=hostname,
            dbname=database,
            user=username,
            password=pwd,
            port=port_id)

        cur = conn.cursor()

        # create table system
        create_script_system = ''' CREATE TABLE IF NOT EXISTS system(
                            system_id   SERIAL PRIMARY KEY,
                            system_name varchar(40) NOT NULL,
                            system_uptime varchar(40) NOT NULL,
                            system_location varchar(40) NOT NULL,
                            system_process integer NOT NULL,
                            system_services integer NOT NULL,
                            system_timestamp timestamp(0) default date_trunc('second', current_timestamp))'''

        cur.execute(create_script_system)

        # insert data into table system
        insert_script_system = 'INSERT INTO system\
            (system_name,system_uptime,system_location,system_process,system_services)\
            VALUES(%s,%s,%s,%s,%s)'
        insert_value_system = (str(result_system[0]), str(result_system[1]),
                               str(result_system[2]), str(result_system[3]), result_system[4])
        cur.execute(insert_script_system, insert_value_system)


        create_script_process = '''
                            
                            CREATE TABLE IF NOT EXISTS process(
                            process_id   SERIAL PRIMARY KEY,
                            process_handlecount varchar(40) NULL,
                            process_name varchar(400) NULL,
                            process_priority varchar(40) NULL,
                            process_pid varchar(40) NULL,
                            process_threadcount varchar(40)  NULL,
                            process_size varchar(40) NULL,
                            process_timestamp timestamp default date_trunc('second', current_timestamp))'''

        cur.execute(create_script_process)

        # insert data into table process
        query = "INSERT INTO process (process_handlecount,process_name, process_priority,process_pid,process_threadcount, process_size) VALUES (%s, %s, %s,%s,%s,%s)"
        cur.executemany(query, result_process)


        # create table memory
        create_script_memory = ''' CREATE TABLE IF NOT EXISTS memory(
                            memory_id   SERIAL PRIMARY KEY,
                            memory_total_virtual varchar(40) NOT NULL,
                            memory_used_virtual varchar(40) NOT NULL,
                            memory_total_swap varchar(40) NOT NULL,
                            memory_used_swap varchar(40) NOT NULL)'''

        cur.execute(create_script_memory)

        # insert data into table memory
        insert_script_memory = 'INSERT INTO memory\
            (memory_total_virtual,memory_used_virtual,memory_total_swap,memory_used_swap)\
            VALUES(%s,%s,%s,%s)'
        insert_value_memory = (str(result_memory[0]), str(result_memory[1]),
                               str(result_memory[2]), str(result_memory[3]))
        cur.execute(insert_script_memory, insert_value_memory)

        # create table cpu
        create_script_cpu = ''' CREATE TABLE IF NOT EXISTS cpu(
                            cpu_id   SERIAL PRIMARY KEY,
                            cpu_usage varchar(40) NOT NULL,
                            cpu_ram varchar(40) NOT NULL,                           
                            cpu_timestamp timestamp default date_trunc('second', current_timestamp))'''

        cur.execute(create_script_cpu)

        # insert data into table cpu
        insert_script_cpu = 'INSERT INTO cpu\
            (cpu_usage,cpu_ram)\
            VALUES(%s,%s)'
        insert_value_cpu = (str(result_cpu[0]), str(result_cpu[1]))
        cur.execute(insert_script_cpu, insert_value_cpu)

        # create table network
        create_script_network = ''' CREATE TABLE IF NOT EXISTS network(
                            network_id   SERIAL PRIMARY KEY,
                            network_received varchar(40) NOT NULL,
                            network_sent varchar(40) NOT NULL,
                            network_timestamp timestamp default date_trunc('second', current_timestamp))'''

        cur.execute(create_script_network)

        # insert data into table network
        insert_script_network = 'INSERT INTO network\
            (network_received,network_sent)\
            VALUES(%s,%s)'
        insert_value_network = (str(result_network[0]), str(result_network[1]))
        cur.execute(insert_script_network, insert_value_network)

    
        # create table disk
        create_script_disk = ''' CREATE TABLE IF NOT EXISTS disk(
                            disk_id   SERIAL PRIMARY KEY,
                            disk_total varchar(40) NOT NULL,
                            disk_used varchar(40) NOT NULL,
                            disk_free varchar(40) NOT NULL,
                            disk_read_time varchar(40) NOT NULL,
                            disk_write_time varchar(40) NOT NULL)'''

        cur.execute(create_script_disk)

        # insert data into table disk
        insert_script_disk = 'INSERT INTO disk\
            (disk_total,disk_used,disk_free,disk_read_time,disk_write_time)\
            VALUES(%s,%s,%s,%s,%s)'
        insert_value_disk = (str(result_disk[0]), str(result_disk[1]),
                             str(result_disk[2]), str(result_disk[3]), str(result_disk[4]))
        cur.execute(insert_script_disk, insert_value_disk)

        # create table battery
        create_script_battery = ''' CREATE TABLE IF NOT EXISTS battery(
                            battery_id   SERIAL PRIMARY KEY,
                            battery_percent varchar(40) NOT NULL,
                            battery_plugged_in varchar(40) NOT NULL)'''

        cur.execute(create_script_battery)

        # insert data into table battery
        insert_script_battery = 'INSERT INTO battery\
            (battery_percent,battery_plugged_in)\
            VALUES(%s,%s)'
        insert_value_battery = (str(result_battery[0]), str(result_battery[1]))
        cur.execute(insert_script_battery, insert_value_battery)

        # create table server
        create_script_server = ''' CREATE TABLE IF NOT EXISTS server(
                            server_id   SERIAL PRIMARY KEY,
                            server_name varchar(40) NOT NULL,
                            server_ip varchar(40) NOT NULL,
                            server_department varchar(40) NOT NULL)'''

        cur.execute(create_script_server)

        # create table notification
        create_script_notification = ''' CREATE TABLE IF NOT EXISTS notification(
                            notification_id   SERIAL PRIMARY KEY,
                            notification_description varchar(40) NOT NULL,
                            notification_usage varchar(40) NOT NULL,
                            notification_ram varchar(40) NOT NULL,
                            notification_timestamp timestamp default date_trunc('second', current_timestamp))'''

        cur.execute(create_script_notification)

        # insert data into table notification
        insert_script_notification = 'INSERT INTO notification\
            (notification_description,notification_usage,notification_ram)\
            VALUES(%s,%s,%s)'
        insert_value_notification = (
            str(result_notification[0]), str(result_notification[1]), str(result_notification[2]))
        cur.execute(insert_script_notification, insert_value_notification)



        conn.commit()

    except Exception as error:
        print(error)

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


importData()


schedule.every(3).seconds.do(importData)


while True:
    schedule.run_pending()
    time.sleep(1)
