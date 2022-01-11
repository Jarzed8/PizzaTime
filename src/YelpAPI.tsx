import react from 'react';
import axios from 'axios';

var APIKey: string = 'OqbQPK56SI5X21-Px944LiDFZwXpOp4OTkCnYVHRic_uU1c82s-ijAoXvphBRo3LeatDlAD7AjKFPs4sWBkaPCblPb1PmUqNZBTIF2taQLtjfB4pcD4pHvVNkwSGYHYx';

export async function SearchBuisness(location: string): Promise<BusinessSearchResponse> {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
        headers: {
            Authorization: `Bearer ${APIKey}`
        },
        params: {
            location: { location },
            categories: 'pizza',
        }
    })
    if (response) {
        if (response.status === 200) {
            return Promise.resolve(response.data)
        }
        console.error('invalid status code');
    }
    return Promise.reject('invalide response');
}

export interface BusinessSearchResponse {
    total: number;
    businesses: Business[];
};

export interface Business {
    price: string;
    phone: string;
    id: string;
    name: string;
    url: string;
    image_url: string;
    location: {
        city: string;
        country: string;
        address1: string;
        state: string
    }
    distance: number
};