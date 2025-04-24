from apscheduler.schedulers.background import BackgroundScheduler
from app.jobs.tasks import getData, export_to_csv

scheduler = BackgroundScheduler()
# scheduler.add_job(getData, 'interval', seconds=15, max_instances=3)
scheduler.add_job(export_to_csv, 'interval', seconds=15, max_instances=1)