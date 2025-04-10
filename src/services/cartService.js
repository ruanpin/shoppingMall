import { LocalStorageHelper } from '@/utils/LocalStorageHelper'

const CART_KEY = 'cartData'

export async function getCartData() {
  return await LocalStorageHelper.get(CART_KEY)
}

export async function addProductToCart(cartData, product) {
  const data = [...cartData]
  const index = data.findIndex(item => item.id === product.id)

  if (index !== -1) {
    data[index].quantity += product.quantity
    if (data[index].quantity <= 0) {
      data.splice(index, 1)
    }
  } else {
    if (product.quantity > 0) {
      data.push({ ...product })
    }
  }

  await LocalStorageHelper.set(CART_KEY, data)
  return data
}

export async function updateQuantityInCart(cartData, id, quantity) {
  const data = [...cartData]
  const index = data.findIndex(item => item.id === id)

  if (index !== -1) {
    data[index].quantity = quantity
    if (data[index].quantity <= 0) {
      data.splice(index, 1)
    }
  }

  await LocalStorageHelper.set(CART_KEY, data)
  return data
}

export async function deleteProducts(cartData, checkedItems) {
  const data = [...cartData]
  const result = data.filter(product => !checkedItems.includes(product.id))

  await LocalStorageHelper.set(CART_KEY, result)
  return data
}

export async function clearCart() {
  await LocalStorageHelper.remove(CART_KEY)
  return []
}