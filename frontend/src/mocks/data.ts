import { OrderStatus } from '~/constants/order';
import { CartItem } from '~/models/CartItem';
import { Order } from '~/models/Order';
import { Product, ProductsResponse } from '~/models/ProductSchema';

export const products: ProductsResponse = {
	data: [
		{
			id: '4dea6dad-430b-4d63-81e4-5253d5f84a05',
			title: 'Action Figure Superman',
			description:
				'A fun and exciting Action Figure Superman for kids of all ages. Perfect for imaginative play and skill development.',
			price: 89,
			qty: 181,
		},
		{
			id: 'a660f30c-f957-4819-ae51-5cfc86b183ff',
			title: 'Toy Doctor Kit',
			description:
				'A fun and exciting Toy Doctor Kit for kids of all ages. Perfect for imaginative play and skill development.',
			price: 82,
			qty: 125,
		},
		{
			id: 'a3b7399e-dd3d-43d0-9cbb-136bf35859ed',
			title: 'Basketball Hoop',
			description:
				'A fun and exciting Basketball Hoop for kids of all ages. Perfect for imaginative play and skill development.',
			price: 75,
			qty: 56,
		},
		{
			id: '277506e7-4234-4aca-9e66-5a9df496b5d2',
			title: 'Play Tent Castle',
			description:
				'A fun and exciting Play Tent Castle for kids of all ages. Perfect for imaginative play and skill development.',
			price: 21,
			qty: 0,
		},
		{
			id: 'da77be7b-eaaf-48e3-8303-c2cd65e560c6',
			title: "Transformer's Bumblebee robot",
			description: 'A nice and transformable Bumblebee robot',
			price: 140,
			qty: 0,
		},
		{
			id: '3e187270-5145-453d-bc9b-ee09ac6ef7c5',
			title: 'Action Figure Superman',
			description:
				'A fun and exciting Action Figure Superman for kids of all ages. Perfect for imaginative play and skill development.',
			price: 39,
			qty: 104,
		},
		{
			id: '38d85ec0-b94c-4a2c-9922-b7c4778c4531',
			title: 'Magic Tricks Set',
			description:
				'A fun and exciting Magic Tricks Set for kids of all ages. Perfect for imaginative play and skill development.',
			price: 14,
			qty: 114,
		},
		{
			id: '4cf241e4-6560-4b45-ba61-1e520cc29dd1',
			title: 'Crayola Art Set',
			description:
				'A fun and exciting Crayola Art Set for kids of all ages. Perfect for imaginative play and skill development.',
			price: 22,
			qty: 149,
		},
		{
			id: 'd4225c94-fd87-4b33-b033-384095694087',
			title: 'Nerf Blaster Elite',
			description:
				'A fun and exciting Nerf Blaster Elite for kids of all ages. Perfect for imaginative play and skill development.',
			price: 91,
			qty: 12,
		},
		{
			id: 'dc5fbdec-7bef-4f8d-8dd4-ed40cfdae790',
			title: "Transformer's Megatron robot",
			description: 'A nice and transformable Megatron robot',
			price: 150,
			qty: 0,
		},
		{
			id: '57738f86-37a7-4c28-8da6-c263963ce3c9',
			title: 'Toy Race Car Set',
			description:
				'A fun and exciting Toy Race Car Set for kids of all ages. Perfect for imaginative play and skill development.',
			price: 39,
			qty: 138,
		},
		{
			id: '2a19b97d-d9e4-46d2-b6b0-740f8de23198',
			title: 'Spiderman Action Figure',
			description:
				'A fun and exciting Spiderman Action Figure for kids of all ages. Perfect for imaginative play and skill development.',
			price: 80,
			qty: 0,
		},
		{
			id: '54632503-e57c-433c-954a-6c5b270a446a',
			title: 'Teddy Bear Plushie',
			description:
				'A fun and exciting Teddy Bear Plushie for kids of all ages. Perfect for imaginative play and skill development.',
			price: 20,
			qty: 48,
		},
		{
			id: 'a3fb6049-4018-443b-a42c-9061fadd3275',
			title: 'Action Figure Superman',
			description:
				'A fun and exciting Action Figure Superman for kids of all ages. Perfect for imaginative play and skill development.',
			price: 29,
			qty: 26,
		},
		{
			id: 'd680b30c-5a5d-40e4-bcab-2ce1f2eed6df',
			title: 'Remote Control Drone',
			description:
				'A fun and exciting Remote Control Drone for kids of all ages. Perfect for imaginative play and skill development.',
			price: 57,
			qty: 134,
		},
		{
			id: '2ea69946-2519-4564-a514-4543efcc8249',
			title: 'Toy Race Car Set',
			description:
				'A fun and exciting Toy Race Car Set for kids of all ages. Perfect for imaginative play and skill development.',
			price: 60,
			qty: 114,
		},
		{
			id: '413afbd2-5b9a-47c1-92df-e560f111dcc3',
			title: "Scooter Kid's Ride",
			description:
				"A fun and exciting Scooter Kid's Ride for kids of all ages. Perfect for imaginative play and skill development.",
			price: 92,
			qty: 81,
		},
		{
			id: '636e446c-fbf1-4e1c-a1d7-2f8a6a7078ec',
			title: 'Transformers Optimus Prime',
			description:
				'A fun and exciting Transformers Optimus Prime for kids of all ages. Perfect for imaginative play and skill development.',
			price: 44,
			qty: 53,
		},
		{
			id: 'de152ced-51ca-4157-9a0f-62b72e3e7eec',
			title: 'Crayola Art Set',
			description:
				'A fun and exciting Crayola Art Set for kids of all ages. Perfect for imaginative play and skill development.',
			price: 59,
			qty: 184,
		},
		{
			id: 'c2ea4aa7-27d2-4708-aadd-8549a6c6484b',
			title: 'UNO Card Game',
			description:
				'A fun and exciting UNO Card Game for kids of all ages. Perfect for imaginative play and skill development.',
			price: 94,
			qty: 40,
		},
		{
			id: '06d7292f-261e-4622-a19c-e70e53865d9b',
			title: 'Toy Train Set',
			description:
				'A fun and exciting Toy Train Set for kids of all ages. Perfect for imaginative play and skill development.',
			price: 30,
			qty: 200,
		},
		{
			id: '3810dd6a-60f4-4514-b53d-8b58017cda7d',
			title: 'RC Helicopter',
			description:
				'A fun and exciting RC Helicopter for kids of all ages. Perfect for imaginative play and skill development.',
			price: 56,
			qty: 188,
		},
		{
			id: '4b825b46-689c-43a1-bbbd-86d9bdd9809d',
			title: 'Toy Binoculars',
			description:
				'A fun and exciting Toy Binoculars for kids of all ages. Perfect for imaginative play and skill development.',
			price: 52,
			qty: 46,
		},
		{
			id: '837f3ee0-e338-4fc2-8422-e3bdeb93fb86',
			title: 'Play Tent Castle',
			description:
				'A fun and exciting Play Tent Castle for kids of all ages. Perfect for imaginative play and skill development.',
			price: 21,
			qty: 80,
		},
		{
			id: '68f02187-220d-4220-a80f-9eeae9fa2c0d',
			title: 'Toy Binoculars',
			description:
				'A fun and exciting Toy Binoculars for kids of all ages. Perfect for imaginative play and skill development.',
			price: 18,
			qty: 199,
		},
		{
			id: '33810a31-ce6e-460c-8b2b-0a4d8e4b08f6',
			title: 'Action Figure Superman',
			description:
				'A fun and exciting Action Figure Superman for kids of all ages. Perfect for imaginative play and skill development.',
			price: 15,
			qty: 43,
		},
		{
			id: 'b549c76d-2037-4f3f-9cae-4c1990fc56df',
			title: 'Crayola Art Set',
			description:
				'A fun and exciting Crayola Art Set for kids of all ages. Perfect for imaginative play and skill development.',
			price: 22,
			qty: 69,
		},
		{
			id: '6fd32807-46b3-41d7-a505-b83b380efffc',
			title: 'Building Blocks Set',
			description:
				'A fun and exciting Building Blocks Set for kids of all ages. Perfect for imaginative play and skill development.',
			price: 94,
			qty: 44,
		},
		{
			id: '23ec97b8-4c02-48e9-98d5-4a108bf8c6a3',
			title: 'Magic Tricks Set',
			description:
				'A fun and exciting Magic Tricks Set for kids of all ages. Perfect for imaginative play and skill development.',
			price: 43,
			qty: 63,
		},
		{
			id: 'd076e41e-0d25-4e11-944f-1bbe3fa0a674',
			title: 'Transformers Optimus Prime',
			description:
				'A fun and exciting Transformers Optimus Prime for kids of all ages. Perfect for imaginative play and skill development.',
			price: 99,
			qty: 65,
		},
		{
			id: '48bd29b4-2691-4ce0-b7f9-19ed3a50516f',
			title: 'RC Helicopter',
			description:
				'A fun and exciting RC Helicopter for kids of all ages. Perfect for imaginative play and skill development.',
			price: 22,
			qty: 141,
		},
		{
			id: 'f3885a6e-00e3-4405-8b50-5667463a6d56',
			title: 'Remote Control Drone',
			description:
				'A fun and exciting Remote Control Drone for kids of all ages. Perfect for imaginative play and skill development.',
			price: 64,
			qty: 138,
		},
		{
			id: '2602914f-68e2-47b3-80b7-651241c2248a',
			title: 'RC Car Turbo Racer',
			description:
				'A fun and exciting RC Car Turbo Racer for kids of all ages. Perfect for imaginative play and skill development.',
			price: 55,
			qty: 103,
		},
		{
			id: '7c69b77f-5347-4fc2-a7de-651d49adf23f',
			title: 'Puzzle 1000 Pieces',
			description:
				'A fun and exciting Puzzle 1000 Pieces for kids of all ages. Perfect for imaginative play and skill development.',
			price: 92,
			qty: 56,
		},
		{
			id: 'e52923a9-6066-4ad9-8173-df4102917be1',
			title: 'RC Helicopter',
			description:
				'A fun and exciting RC Helicopter for kids of all ages. Perfect for imaginative play and skill development.',
			price: 19,
			qty: 181,
		},
		{
			id: '2003e4cf-ac27-4484-8619-03bc53f27073',
			title: 'Toy Microscope',
			description:
				'A fun and exciting Toy Microscope for kids of all ages. Perfect for imaginative play and skill development.',
			price: 51,
			qty: 151,
		},
		{
			id: 'fc76f96c-7d00-42a1-80fd-09e196aa0338',
			title: 'RC Car Turbo Racer',
			description:
				'A fun and exciting RC Car Turbo Racer for kids of all ages. Perfect for imaginative play and skill development.',
			price: 84,
			qty: 0,
		},
		{
			id: '26bb2e73-7f6e-4097-90e2-64e858fea0c6',
			title: 'Teddy Bear Plushie',
			description:
				'A fun and exciting Teddy Bear Plushie for kids of all ages. Perfect for imaginative play and skill development.',
			price: 7,
			qty: 192,
		},
		{
			id: '3eacb680-f6aa-4e46-942a-1ad2f318b91a',
			title: 'Toy Microscope',
			description:
				'A fun and exciting Toy Microscope for kids of all ages. Perfect for imaginative play and skill development.',
			price: 43,
			qty: 124,
		},
		{
			id: '97d7dcd9-1acb-4c1e-8901-d7ce5521309d',
			title: 'Teddy Bear Plushie',
			description:
				'A fun and exciting Teddy Bear Plushie for kids of all ages. Perfect for imaginative play and skill development.',
			price: 95,
			qty: 55,
		},
		{
			id: 'b3563889-8acb-4040-bc24-8efbd3df4232',
			title: 'Toy Guitar',
			description:
				'A fun and exciting Toy Guitar for kids of all ages. Perfect for imaginative play and skill development.',
			price: 46,
			qty: 83,
		},
		{
			id: 'e8c89006-040d-4977-8ca3-6147c1698c8e',
			title: 'Toy Train Set',
			description:
				'A fun and exciting Toy Train Set for kids of all ages. Perfect for imaginative play and skill development.',
			price: 94,
			qty: 127,
		},
		{
			id: 'e3ab97c4-27e8-4a07-aeee-7457de2f7e80',
			title: 'Toy Piano',
			description:
				'A fun and exciting Toy Piano for kids of all ages. Perfect for imaginative play and skill development.',
			price: 93,
			qty: 64,
		},
		{
			id: '0c455682-bb83-43b1-95af-4ac3d8e41571',
			title: 'Crayola Art Set',
			description:
				'A fun and exciting Crayola Art Set for kids of all ages. Perfect for imaginative play and skill development.',
			price: 33,
			qty: 0,
		},
		{
			id: '5f4321a0-e999-4636-98e6-1483b1c96562',
			title: 'Toy Stunt Car',
			description:
				'A fun and exciting Toy Stunt Car for kids of all ages. Perfect for imaginative play and skill development.',
			price: 35,
			qty: 39,
		},
		{
			id: '286a500d-aeb6-4606-9b53-0df831c809f5',
			title: 'Hot Wheels Track Builder',
			description:
				'A fun and exciting Hot Wheels Track Builder for kids of all ages. Perfect for imaginative play and skill development.',
			price: 65,
			qty: 40,
		},
		{
			id: 'ea995ce3-acdf-4b8c-acac-d7b19fc84368',
			title: 'Puzzle 1000 Pieces',
			description:
				'A fun and exciting Puzzle 1000 Pieces for kids of all ages. Perfect for imaginative play and skill development.',
			price: 77,
			qty: 0,
		},
		{
			id: '38760cf3-5bd9-4dca-9d65-9263509afc54',
			title: "Scooter Kid's Ride",
			description:
				"A fun and exciting Scooter Kid's Ride for kids of all ages. Perfect for imaginative play and skill development.",
			price: 23,
			qty: 55,
		},
		{
			id: 'ab91d363-dde8-4573-b120-62c1d32bdd44',
			title: 'Jenga Classic',
			description:
				'A fun and exciting Jenga Classic for kids of all ages. Perfect for imaginative play and skill development.',
			price: 96,
			qty: 170,
		},
		{
			id: 'fd5ac00b-2e38-4ef2-a30c-6a2707da28d7',
			title: 'Play-Doh Fun Factory',
			description:
				'A fun and exciting Play-Doh Fun Factory for kids of all ages. Perfect for imaginative play and skill development.',
			price: 43,
			qty: 98,
		},
		{
			id: 'ddf8862d-941b-4b34-aea7-58245dc8a6d8',
			title: 'Puzzle 1000 Pieces',
			description:
				'A fun and exciting Puzzle 1000 Pieces for kids of all ages. Perfect for imaginative play and skill development.',
			price: 51,
			qty: 89,
		},
		{
			id: 'e591b5e2-3b83-45d8-9a84-e6d7c28db5d9',
			title: 'Stuffed Dinosaur',
			description:
				'A fun and exciting Stuffed Dinosaur for kids of all ages. Perfect for imaginative play and skill development.',
			price: 28,
			qty: 76,
		},
	],
	count: 52,
};

const p_data = products.data;
const available = p_data.filter((p) => p.qty > 0);
export const availableProducts: ProductsResponse = {
	data: available,
	count: available.length,
};

export const cart: CartItem[] = [
	{
		product: {
			description: 'Short Product Description1',
			id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
			price: 24,
			title: 'ProductOne',
			qty: 32,
		},
		count: 2,
	},
	{
		product: {
			description: 'Short Product Description7',
			id: '7567ec4b-b10c-45c5-9345-fc73c48a80a1',
			price: 15,
			title: 'ProductName',
			qty: 12,
		},
		count: 5,
	},
];

export const orders: Order[] = [
	{
		id: '1',
		address: {
			address: 'some address',
			firstName: 'Name',
			lastName: 'Surname',
			comment: '',
		},
		items: [
			{ productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa', count: 2 },
			{ productId: '7567ec4b-b10c-45c5-9345-fc73c48a80a1', count: 5 },
		],
		statusHistory: [
			{ status: OrderStatus.Open, timestamp: Date.now(), comment: 'New order' },
		],
	},
	{
		id: '2',
		address: {
			address: 'another address',
			firstName: 'John',
			lastName: 'Doe',
			comment: 'Ship fast!',
		},
		items: [{ productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa', count: 3 }],
		statusHistory: [
			{
				status: OrderStatus.Sent,
				timestamp: Date.now(),
				comment: 'Fancy order',
			},
		],
	},
];
