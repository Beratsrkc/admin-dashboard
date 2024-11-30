'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { pb } from '@/lib/pocketbase';
import { title } from 'process';
import React, { useEffect, useState } from 'react'

const TestPage = () => {

    const [products, setProducts] = useState([]);

    const [newTitle, setNewTitle] = useState("");

    const fetschproduct = async () => {
        try {
            const records = await pb.collection('product').getFullList({
                sort: '+created',
            });
            setProducts(records)
        } catch (error) {

        }
    }

    const deleteProduct = async (id) => {
        try {
            await pb.collection('product').delete(id);
            setProducts(products.filter(product => product.id !== id))
        } catch (error) {

        }
    }
    const updateProduct = async (id) => {
        try {

            const record = await pb.collection('product').update(id, { title: newTitle });
            setProducts(products.map(product =>
                product.id === id ? { ...product, title: newTitle } : product
            ));
            setNewTitle("");
        } catch (error) {

        }
    }

    useEffect(() => {
        fetschproduct();
    }, []);

    return (
        <div>
            {products.map((product) => (
                <div key={product.id}>
                    {product.title}
                    <Input
                        type='text'
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <Button variant={"default"} onClick={() => updateProduct(product.id)}> Update</Button>

                    <Button variant={"destructive"} onClick={() => deleteProduct(product.id)}> Delete</Button>
                </div>
            ))}
        </div>
    )
}

export default TestPage