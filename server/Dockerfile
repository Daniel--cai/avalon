FROM golang:1.11-alpine3.8  as builder

RUN apk add --update--no-cache ca-certificates git 

ENV GO111MODULE auto
ENV CGO_ENABLED 0
ENV GOARCH amd64
ENV GOOS linux

WORKDIR /src

RUN go get github.com/githubnemo/CompileDaemon

COPY ./go.mod ./go.sum ./
RUN go mod download

COPY ./ ./

# RUN go build -ldflags="-w -s" -a -installsuffix cgo -o /main .

# FROM alpine:3.7

# COPY --from=builder /main ./
# CMD ["./main"]

ENTRYPOINT CompileDaemon -log-prefix=false -build="go build main.go" -command="./main"


