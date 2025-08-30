{
  description = "Can't wait to";

  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = inputs @ {flake-parts, ...}:
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = ["x86_64-linux" "aarch64-linux" "aarch64-darwin" "x86_64-darwin"];
      perSystem = {
        config,
        self',
        inputs',
        pkgs,
        system,
        ...
      }: {
        devShells.default = pkgs.mkShell {
          packages = [
            (pkgs.python313.withPackages(pypkgs: [
              pypkgs.flask
              pypkgs.psycopg
              pypkgs.python-dotenv
              pypkgs.psycopg-pool
              pypkgs.flask-cors
            ]))

            pkgs.pgcli
            pkgs.postgresql

            pkgs.prettierd
            pkgs.nodejs_22
            pkgs.typescript-language-server
          ];

          shellHook = ''
            export SHELL='${pkgs.mksh}/bin/mksh'
            export PGHOST="$(pwd)/.tmp/sockets"
          '';
        };
      };
    };
}

