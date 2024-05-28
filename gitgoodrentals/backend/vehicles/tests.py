from django.test import TestCase
from .models import Vehicle

class VehicleModelTest(TestCase):
    def setUp(self):
        # Create a vehicle for testing
        self.vehicle = Vehicle.objects.create(
            model="Civic",
            brand="Honda",
            color="Red",
            year=2020,
            price=999,
        )

    def test_vehicle_creation(self):
        # Test that the vehicle was created successfully
        self.assertEqual(self.vehicle.model, "Civic")
        self.assertEqual(self.vehicle.brand, "Honda")
        self.assertEqual(self.vehicle.color, "Red")
        self.assertEqual(self.vehicle.year, 2020)
        self.assertEqual(self.vehicle.price, 999)

    def test_get_vehicle_by_model(self):
        # Test the get_vehicle_by_model class method
        retrieved_vehicle = Vehicle.objects.get(model="Civic")
        self.assertIsNotNone(retrieved_vehicle)
        self.assertEqual(self.vehicle.model, "Civic")
        self.assertEqual(self.vehicle.brand, "Honda")
        self.assertEqual(self.vehicle.color, "Red")
        self.assertEqual(self.vehicle.year, 2020)
        self.assertEqual(self.vehicle.price, 999)

    def test_update_vehicle(self):
        # Test the update_vehicle instance method
        self.vehicle.model = "Corolla"
        self.vehicle.brand = "Toyota"
        self.vehicle.color = "Gray"
        self.vehicle.year = 2021
        self.vehicle.save()
        self.vehicle.refresh_from_db()  # Refresh the vehicle instance from the database
        self.assertEqual(self.vehicle.model, "Corolla")
        self.assertEqual(self.vehicle.brand, "Toyota")
        self.assertEqual(self.vehicle.color, "Gray")
        self.assertEqual(self.vehicle.year, 2021)

    def test_delete_vehicle(self):
        # Test the delete_vehicle instance method
        vehicle_to_delete = Vehicle.objects.get(model="Civic")
        vehicle_to_delete.delete()
        with self.assertRaises(Vehicle.DoesNotExist):
            Vehicle.objects.get(model="Civic")