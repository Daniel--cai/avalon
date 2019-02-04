FROM golang:1.11-alpine  as builder

ENV GO111MODULE=on
RUN apk add --no-cache ca-certificates git

WORKDIR /src

COPY ./go.mod ./go.sum ./
RUN go mod download


COPY ./ ./

RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -a -installsuffix cgo -o /main .

FROM alpine:3.7
RUN go get github.com/oxequa/realize
COPY --from=builder /realize.yaml ./
COPY --from=builder /main ./
# CMD ["./main"]
CMD ["realize", "start"] 



