# Use Ubuntu 22.04 as base image
FROM ubuntu:22.04

# Update packages and install necessary tools
RUN apt-get update && \
    apt-get install -y curl gnupg ca-certificates git

# Install Node.js and npm
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# Install Truffle and Ganache CLI globally
RUN npm install -g truffle ganache-cli

# Install IPFS
RUN curl -s https://ipfs.io/ipns/dist.ipfs.io/go-ipfs/v0.11.0/go-ipfs_v0.11.0_linux-amd64.tar.gz --output go-ipfs.tar.gz && \
    tar -xvzf go-ipfs.tar.gz && \
    rm go-ipfs.tar.gz && \
    cd go-ipfs && \
    ./install.sh && \
    cd .. && \
    rm -r go-ipfs

# Install IPFS Cluster
RUN curl -s https://dist.ipfs.io/ipfs-cluster-service/v0.14.1/ipfs-cluster-service_v0.14.1_linux-amd64.tar.gz --output ipfs-cluster-service.tar.gz && \
    tar -xvzf ipfs-cluster-service.tar.gz && \
    rm ipfs-cluster-service.tar.gz && \
    cd ipfs-cluster-service && \
    ./install.sh && \
    cd .. && \
    rm -r ipfs-cluster-service

RUN curl -s https://dist.ipfs.io/ipfs-cluster-ctl/v0.14.1/ipfs-cluster-ctl_v0.14.1_linux-amd64.tar.gz --output ipfs-cluster-ctl.tar.gz && \
    tar -xvzf ipfs-cluster-ctl.tar.gz && \
    rm ipfs-cluster-ctl.tar.gz && \
    cd ipfs-cluster-ctl && \
    ./install.sh && \
    cd .. && \
    rm -r ipfs-cluster-ctl

# Set up a working directory for your project
WORKDIR /workspace

# Expose necessary ports
EXPOSE 8545 4001 4002 4003 9094 9095

# Set up entrypoint
ENTRYPOINT ["/bin/bash"]
