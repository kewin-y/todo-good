# Todo Good

## Postgresql Help

The devshell contains the latest version of Postgresql

```sh
initdb -D .tmp/pgdata -U postgres

pg_ctl -D .tmp/pgdata -l logfile -o "-k $PWD/.tmp/sockets" start

pg_ctl -D .tmp/pgdata stop

pgcli -h $PWD/.tmp/sockets -U postgres
```

