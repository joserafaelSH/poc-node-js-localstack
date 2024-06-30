#!/bin/bash

awslocal dynamodb create-table     --table-name items_table     --key-schema AttributeName=id,KeyType=HASH     --attribute-definitions AttributeName=id,AttributeType=S     --billing-mode PAY_PER_REQUEST     --region us-east-1
