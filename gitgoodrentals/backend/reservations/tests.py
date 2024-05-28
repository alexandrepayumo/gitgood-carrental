from django.test import TestCase
from .models import Reservation
from users.models import CustomUser
from vehicles.models import Vehicle

class ReservationModelTest(TestCase):
    def setUp(self):
        # Create a user, vehicle, and reservation for testing
        self.user = CustomUser.objects.create(
            # full_name="John Doe",
            first_name="John",
            last_name="Doe",
            email="john@example.com",
            # phone="1234567890",
            # role="user",
            # password_hash="hashed_password",
        )
        self.vehicle1 = Vehicle.objects.create(
            model="Civic",
            brand="Honda",
            color="Red",
            year=2020,
            price=999,
        )
        self.vehicle2 = Vehicle.objects.create(
            model="Corolla",
            brand="Toyota",
            color="Gray",
            year=2021,
            price=999,
        )
        self.reservation = Reservation.objects.create(
            user=self.user,
            vehicle=self.vehicle1,
        )

    def test_reservation_creation(self):
        # Test that the reservation was created successfully
        self.assertEqual(self.reservation.user, self.user)
        self.assertEqual(self.reservation.vehicle, self.vehicle1)

    def test_get_reservation_by_vehicle(self):
        # Test the get_reservation_by_vehicle class method
        retrieved_reservation = Reservation.objects.get(vehicle=self.vehicle1)
        self.assertIsNotNone(retrieved_reservation)
        self.assertEqual(self.reservation.user, self.user)
        self.assertEqual(self.reservation.vehicle, self.vehicle1)

    def test_update_reservation(self):
        # Test the update_reservation instance method
        self.reservation.vehicle = self.vehicle2
        self.reservation.save()
        self.reservation.refresh_from_db()  # Refresh the reservation instance from the database
        self.assertEqual(self.reservation.vehicle, self.vehicle2)

    def test_delete_reservation(self):
        # Test the delete_reservation instance method
        reservation_to_delete = Reservation.objects.get(vehicle=self.vehicle1)
        reservation_to_delete.delete()
        with self.assertRaises(Reservation.DoesNotExist):
            Reservation.objects.get(vehicle=self.vehicle1)