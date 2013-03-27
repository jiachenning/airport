appender('CONSOLE', ConsoleAppender) {
    encoder(PatternLayoutEncoder) {
        pattern = '%d{yyyy-MM-dd HH:mm:ss} %msg%n'
    }
}
root(INFO, ['CONSOLE'])
