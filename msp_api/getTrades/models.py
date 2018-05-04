from django.db import models


class Trade(models.Model):
    id = models.IntegerField
    trade_date = models.CharField(max_length=20)
    shares = models.DecimalField(max_digits=10, decimal_places=4)
    price_per_share = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    pretax = models.BooleanField(default=False)
    broker_id = models.DecimalField(max_digits=5, decimal_places=0, default=2)
    sector_id = models.DecimalField(max_digits=5, decimal_places=0, default=0)
    symbol_id = models.DecimalField(max_digits=5, decimal_places=0, default=0)
    portfolio_id = models.DecimalField(max_digits=5, decimal_places=0, default=2)

    def __str__(self):
        return self.trade_date
