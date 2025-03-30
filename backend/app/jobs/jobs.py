from apscheduler.schedulers.background import BackgroundScheduler
from app.jobs.tasks import getData

scheduler = BackgroundScheduler()
scheduler.add_job(getData, 'interval', seconds=6)