FROM golang:onbuild as builder
RUN mkdir /build
ADD . /build
WORKDIR /build
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

FROM alpine:3.7
COPY --from=builder /build/main /app/
WORKDIR /app
CMD ["./main"]
