#!/bin/bash


showHelp()
{
  echo "Builds protobuf file" >&2
  echo "  Usage: $ ./build.sh [FILE.proto]" >&2
  echo "Example: $ ./build.sh dummy.proto" >&2
}

if [ $# -lt 1 ] ; then
  showHelp
  exit 1
fi

protoc -I=. ./protos/$1 \
       --js_out=import_style=commonjs,binary:./server \
       --grpc_out=./server \
       --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`
