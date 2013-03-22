appender("STDOUT", ConsoleAppender) {
  encoder(PatternLayoutEncoder) {
    pattern = "%d{HH:mm:ss} %-5level %logger{36} - %msg%n"
  }
}
root(INFO, ["STDOUT"])