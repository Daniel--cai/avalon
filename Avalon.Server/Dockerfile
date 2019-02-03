FROM golang:onbuild as builder
RUN mkdir /build
ADD . /build

FROM alpine:3.7
COPY --from=builder /build/main /app/
WORKDIR /app
CMD ["./main"]
