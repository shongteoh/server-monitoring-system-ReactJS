from hashlib import new
from multiprocessing import Condition
from unittest import result
import psutil
import shutil
import subprocess

import time


from puresnmp import get
ip = '127.0.0.1'
community = 'public'


def systemData():
    OID = '.1.3.6.1.2.1.1.5.0'
    systemName = get(ip, community, OID)
    newSystemName = systemName.decode("utf-8")

    OID = '.1.3.6.1.2.1.1.3.0'
    systemUptime = get(ip, community, OID)
    newSystemUptime = str(systemUptime).split('.')
    finalSystemUptime = newSystemUptime[0]

    OID = '.1.3.6.1.2.1.1.6.0'
    systemLocation = get(ip, community, OID)
    newSystemLocation = systemLocation.decode("utf-8")

    OID = '.1.3.6.1.2.1.25.1.6.0'
    systemProcess = get(ip, community, OID)

    OID = '.1.3.6.1.2.1.1.7.0'
    systemServices = get(ip, community, OID)

    return [newSystemName, finalSystemUptime, newSystemLocation, systemProcess, systemServices]


def processData():
    # traverse the software list
    Data = subprocess.check_output(['wmic', 'process', 'list', 'brief'])
    a = str(Data)

    # try block
    # arrange the string
    process = []

    try:
        for i in range(len(a)):
            if i == 0:
                continue
            result = a.split("\\r\\r\\n")[i]
            split_input = result.split()
            handle_count = split_input[0]
            name = split_input[1]
            priority = split_input[2]
            id = split_input[3]
            count = split_input[4]
            size = split_input[5]
            newSize = (int(size)) // (2**10)
            tuplex = (handle_count, )
            new = tuplex + (name,) + (priority,) + (id,) + (count, ) + (newSize,) 

            process.append(new)

    except IndexError as e:
        pass

    return process

import psutil
def memoryData():

    memory_total_virtual = (psutil.virtual_memory()[0])//(2**30)
    memory_used_virtual = (psutil.virtual_memory()[3])//(2**30)
    memory_total_swap = (psutil.swap_memory()[0])//(2**30)
    memory_used_swap = (psutil.swap_memory()[2]//(2**30))

    return (memory_total_virtual, memory_used_virtual, memory_total_swap, memory_used_swap)


def cpuData():
    cpu_usage = psutil.cpu_percent(1)
    cpu_ram = (psutil.virtual_memory()[2])

    return(cpu_usage, cpu_ram)


def networkData():

    net_stat = psutil.net_io_counters()
    net_in_1 = net_stat.bytes_recv
    net_out_1 = net_stat.bytes_sent
    time.sleep(1)
    net_stat = psutil.net_io_counters()
    net_in_2 = net_stat.bytes_recv
    net_out_2 = net_stat.bytes_sent

    net_in = round((net_in_2 - net_in_1) / 1024 / 1024, 3)
    net_out = round((net_out_2 - net_out_1) / 1024 / 1024, 3)

    

    return (net_in, net_out)


def diskData():

    total, used, free = shutil.disk_usage('/')

    disk_total = (total // (2**30))
    disk_used = (used // (2**30))
    disk_free = (free // (2**30))

    disk_read_time = (psutil.disk_io_counters()[4]) // 1000
    disk_write_time = (psutil.disk_io_counters()[5]) // 1000

    return (disk_total, disk_used, disk_free, disk_read_time, disk_write_time)


def batteryData():
    battery_percent = psutil.sensors_battery()[0]
    battery_plugged_in = psutil.sensors_battery()[2]
    
    if battery_plugged_in:
        battery_plugged_in = "Plugged in"
    else:
        battery_plugged_in="On Battery Use"
    
    return(battery_percent, battery_plugged_in)


def notificationData():
    usage = psutil.cpu_percent(1)
    ram = (psutil.virtual_memory()[2])
    condition = "Everything is good"
    
    if usage > 15 and ram> 85 :
        condition = "CPU usage exceed 25% and RAM exceed 85%"
    else:
        if usage > 15:
            condition= "CPU usage exceed 25%"
        if ram > 85:
            condition = "RAM exceed 85%"
    
    tuplex = (condition, usage,ram )
    
    return (tuplex)

