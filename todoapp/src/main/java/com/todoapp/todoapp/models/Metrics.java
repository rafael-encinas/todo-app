package com.todoapp.todoapp.models;

public class Metrics {
    
		String overallAverage;
		String lowPriorityAverage;
		String medPriorityAverage;
		String highPriorityAverage;

		public Metrics(String overallAverage, String lowPriorityAverage, String medPriorityAverage,
				String highPriorityAverage) {
			this.overallAverage = overallAverage;
			this.lowPriorityAverage = lowPriorityAverage;
			this.medPriorityAverage = medPriorityAverage;
			this.highPriorityAverage = highPriorityAverage;
		}

		public Metrics(){

		}

		public String getOverallAverage() {
			return overallAverage;
		}

		public void setOverallAverage(String overallAverage) {
			this.overallAverage = overallAverage;
		}

		public String getLowPriorityAverage() {
			return lowPriorityAverage;
		}

		public void setLowPriorityAverage(String lowPriorityAverage) {
			this.lowPriorityAverage = lowPriorityAverage;
		}

		public String getMedPriorityAverage() {
			return medPriorityAverage;
		}

		public void setMedPriorityAverage(String medPriorityAverage) {
			this.medPriorityAverage = medPriorityAverage;
		}

		public String getHighPriorityAverage() {
			return highPriorityAverage;
		}

		public void setHighPriorityAverage(String highPriorityAverage) {
			this.highPriorityAverage = highPriorityAverage;
		}
}
