# Todo Good

## Postgresql Help

The devshell contains the latest version of Postgresql

```sh
initdb -D .tmp/pgdata -U postgres -A md5 --pwfile=password

pg_ctl -D .tmp/pgdata -l logfile -o "-k $PGHOST" start

pg_ctl -D .tmp/pgdata stop

pgcli -U postgres
```

