function onInputChange(e) {
    const value_len = e.value.trim().length;
    if (value_len == 0) {
        e.classList.remove("has-content")
    } else {
        if (!e.classList.contains("has-content")) {
            e.classList.add("has-content")
        }
    }
}