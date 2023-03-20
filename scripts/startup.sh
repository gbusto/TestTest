#!/bin/bash

# Start Ganache CLI in the background and redirect output to ganache-cli.log
ganache-cli > ganache-cli.log 2>&1 &

# Initialize IPFS if not already initialized
if [ ! -d "$HOME/.ipfs" ]; then
  ipfs init
fi

# Start IPFS in the background and redirect output to ipfs.log
ipfs daemon > ipfs.log 2>&1 &

# Initialize IPFS Cluster if not already initialized
if [ ! -d "$HOME/.ipfs-cluster" ]; then
  ipfs-cluster-service init
fi

# Start IPFS Cluster in the background and redirect output to ipfs-cluster.log
ipfs-cluster-service daemon > ipfs-cluster.log 2>&1 &

# Wait for all background processes to finish
wait
