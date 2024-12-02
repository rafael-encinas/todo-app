package com.todoapp.todoapp.models;

import java.util.List;

public class Response {
    	List<Todo> data;
		Pagination pagination;
		Metrics metrics;
		public Response(List<Todo> data, Pagination pagination, Metrics metrics) {
			this.data = data;
			this.pagination = pagination;
			this.metrics = metrics;
		}

		public Response(){

		}
		public List<Todo> getData() {
			return data;
		}
		public void setData(List<Todo> data) {
			this.data = data;
		}
		public Pagination getPagination() {
			return pagination;
		}
		public void setPagination(Pagination pagination) {
			this.pagination = pagination;
		}
		public Metrics getMetrics() {
			return metrics;
		}
		public void setMetrics(Metrics metrics) {
			this.metrics = metrics;
		}
}
