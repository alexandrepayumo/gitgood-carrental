class VehicleManager():
    def create_vehicle(self, name, brand, price, color=None, year=None, **extra_fields):
        if not name:
            raise ValueError('The Name field must be set')
        if not brand:
            raise ValueError('The Brand field must be set')
        if not price:
            raise ValueError('The Price field must be set')
        vehicle = self.model(color, year, **extra_fields)
        vehicle.save(using=self._db)
        return vehicle