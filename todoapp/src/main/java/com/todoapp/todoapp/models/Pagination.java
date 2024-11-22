package com.todoapp.todoapp.models;

public class Pagination {
    int total_records;
    int total_filtered;
    int current_page;
    int total_pages;
    Integer next_page;
    Integer prev_page;

    public Pagination(int total_records, int total_filtered, int current_page, int total_pages, Integer next_page,
            Integer prev_page) {
        this.total_records = total_records;
        this.total_filtered = total_filtered;
        this.current_page = current_page;
        this.total_pages = total_pages;
        this.next_page = next_page;
        this.prev_page = prev_page;
    }

    public Pagination(){

    }

    public int getTotal_records() {
        return total_records;
    }
    public void setTotal_records(int total_records) {
        this.total_records = total_records;
    }
    public int getTotal_filtered() {
        return total_filtered;
    }
    public void setTotal_filtered(int total_filtered) {
        this.total_filtered = total_filtered;
    }
    public int getCurrent_page() {
        return current_page;
    }
    public void setCurrent_page(int current_page) {
        this.current_page = current_page;
    }
    public int getTotal_pages() {
        return total_pages;
    }
    public void setTotal_pages(int total_pages) {
        this.total_pages = total_pages;
    }
    public int getNext_page() {
        return next_page;
    }
    public void setNext_page(Integer next_page) {
        this.next_page = next_page;
    }
    public Integer getPrev_page() {
        return prev_page;
    }
    public void setPrev_page(Integer prev_page) {
        this.prev_page = prev_page;
    }
}
