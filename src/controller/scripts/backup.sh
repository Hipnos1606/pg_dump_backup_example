#!/bin/bash
pg_dump --username=postgres ejemplo -f ./ejemplo.tar -F t
