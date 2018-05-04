# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('getTrades', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='trade',
            old_name='tradeDate',
            new_name='trade_date',
        ),
        migrations.AddField(
            model_name='trade',
            name='broker_id',
            field=models.DecimalField(decimal_places=0, max_digits=5, default=2),
        ),
        migrations.AddField(
            model_name='trade',
            name='portfolio_id',
            field=models.DecimalField(decimal_places=0, max_digits=5, default=2),
        ),
        migrations.AddField(
            model_name='trade',
            name='pretax',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='trade',
            name='price_per_share',
            field=models.DecimalField(decimal_places=2, max_digits=10, default=0.0),
        ),
        migrations.AddField(
            model_name='trade',
            name='sector_id',
            field=models.DecimalField(decimal_places=0, max_digits=5, default=0),
        ),
        migrations.AddField(
            model_name='trade',
            name='symbol_id',
            field=models.DecimalField(decimal_places=0, max_digits=5, default=0),
        ),
    ]
