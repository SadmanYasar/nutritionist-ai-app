#!/bin/bash
echo "Gathering you ip for dev container"

##############################################################################################
# en (Ethernet) - ib (InfiniBand) - sl (Serial line IP (slip)) - wl (Wireless local area 
network (WLAN)) - ww (Wireless wide area network (WWAN))
#############################################################################################
your_interface_name="eno" 
interface_prefix="en" # Choose the interface network.
iname=$(ip -o link show | sed -rn '/^[0-9]+: en/{s/.: ([^:]*):.*/\1/p}')
ip=`ifconfig $iname  | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | sed 's/inet //g'`

echo "REACT_NATIVE_PACKAGER_HOSTNAME=$ip" > .devcontainer/.env