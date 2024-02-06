from debug.test.factories import UserFactory
from django.contrib.auth.hashers import make_password
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Seed User fixtures for use in development"

    def handle(self, *args, **options):
        self.stdout.write("Seeding auth_user table")
        UserFactory.create(
            email="staff@upwardli.com",
            username="upwardli-staff",
            password=make_password("upwardli"),
            is_staff=True,
            is_superuser=True,
        )
        UserFactory.create(
            email="member@upwardli.com",
            username="upwardli-member",
            password=make_password("upwardli"),
            is_staff=False,
            is_superuser=False,
        )
        self.stdout.write(self.style.SUCCESS("Done"))
