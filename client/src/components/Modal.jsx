import * as React from 'react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SelectBasic from './Select';
import { useProducts } from '../context/ProductContext';
import { useCategories } from '../context/CategoryContext.jsx';
import { Input, Textarea } from './Input';
import { createProductSchema, updateProductSchema } from '../schemas/product.schema.js';
import { DialogActions } from '@mui/material';
import { categorySchema } from '../schemas/category.schema.js';

export default function AlertDialog({ open, setOpen }) {
  const { categories } = useCategories()
  const { createProduct } = useProducts()
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(createProductSchema(categories))
  })

  const handleClose = () => {
    setOpen(false);
  }

  const onSubmit = handleSubmit((values) => {
    createProduct(values, setOpen, reset)
  })

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ fontWeight: 'bold' }} id="alert-dialog-title">
          Crear Producto.
        </DialogTitle>
        <DialogContent>
          <DialogContentText component="div" id="alert-dialog-description">
            <form className='grid w-full grid-cols-2 gap-3 sm:gap-5' onSubmit={onSubmit}>
              <Input type='text' placeholder='SKU' name='sku' register={register} errors={errors.sku} />
              <Input type='text' placeholder='Nombre' name='name' register={register} errors={errors.name}/>
              <Textarea placeholder='Descripcion' name='description' register={register} errors={errors.description}/>
              <Input type='number' placeholder='Precio' name='price' register={register} errors={errors.price} valueAsNumber/>
              <Input type='number' placeholder='Cantidad' name='stock_quantity' register={register} errors={errors.stock_quantity}/>
              <SelectBasic register={register} name='id_category' errors={errors.id_category}/>           
              <div className='flex space-x-4'>
                <button className='cursor-pointer text-sm sm:text-base font-semibold text-white rounded-md px-4 py-2 bg-green-500/90'>Enviar</button>
                <button className='cursor-pointer text-sm sm:text-base font-semibold text-white rounded-md px-4 py-2 bg-zinc-500/90' onClick={() => setOpen(false)} type='button'>Cancelar</button>
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export function ModalDelete({ openModalDelete, setOpenModalDelete, id, action, title, description }) {
  
  const handleClose = () => {
    setOpenModalDelete(false);
  }

  return (
    <React.Fragment>
      <Dialog
        open={openModalDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ fontWeight: 'bold' }} id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText component="div" id="alert-dialog-description">
            <h1>{description}</h1>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={() => action(id)} className='cursor-pointer text-sm sm:text-base font-semibold text-white rounded-md px-4 py-2 bg-red-500/90'>Eliminar</button>
          <button onClick={() => setOpenModalDelete(false)} className='cursor-pointer text-sm sm:text-base font-semibold text-white rounded-md px-4 py-2 bg-zinc-500/90'>Cancelar</button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export function ModalUpdateProduct({ openModalUpdate, setOpenModalUpdate, product }) {
  const { categories } = useCategories()
  const { updateProduct } = useProducts()
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    resolver: zodResolver(updateProductSchema(categories))
  })

  // Registra los datos iniciales del producto.
  const initialValues = React.useMemo(() => ({
    name: product.name,
    description: product.description,
    price: product.price,
    stock_quantity: product.stock_quantity,
    id_category: product.id_category,
  }), [product])

  const watchedValues = watch();

  const isFormUnchanged = React.useMemo(() => {
    return JSON.stringify(initialValues) === JSON.stringify(watchedValues);
  }, [initialValues, watchedValues]);


  const handleClose = () => {
    setOpenModalUpdate(false);
  }

  const onSubmit = handleSubmit((values) => {
    updateProduct(values, product.id_product, setOpenModalUpdate)
  })

  React.useEffect(() => {
    setValue("name", product.name)
    setValue("description", product.description)
    setValue("price", product.price)
    setValue("stock_quantity", product.stock_quantity)
    setValue("id_category", product.id_category)
  }, [setValue, product])

  return (
    <React.Fragment>
      <Dialog
        open={openModalUpdate}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ fontWeight: 'bold' }} id="alert-dialog-title">
          Actualizar Producto.
        </DialogTitle>
        <DialogContent>
          <DialogContentText component="div" id="alert-dialog-description">
            <form className='grid w-full grid-cols-2 gap-3 sm:gap-5' onSubmit={onSubmit}>
              <Input type='text' placeholder='Nombre' name='name' register={register} errors={errors.name}/>
              <Textarea placeholder='Descripcion' name='description' register={register} errors={errors.description}/>
              <Input type='number' placeholder='Precio' name='price' register={register} errors={errors.price} valueAsNumber/>
              <Input type='number' placeholder='Cantidad' name='stock_quantity' register={register} errors={errors.stock_quantity}/>
              <SelectBasic register={register} name='id_category' errors={errors.id_category} category={product.id_category}/>           
              <div className='flex space-x-4'>
                <button disabled={isFormUnchanged} className={`${isFormUnchanged ? 'hover:cursor-not-allowed bg-zinc-600 text-zinc-400' : 'hover:cursor-pointer text-white bg-green-500/90'} text-sm sm:text-base font-semibold  rounded-md px-4 py-2`}>Actualizar</button>
                <button className='hover:cursor-pointer text-sm sm:text-base font-semibold text-white rounded-md px-4 py-2 bg-zinc-500/90' onClick={() => setOpenModalUpdate(false)} type='button'>Cancelar</button>
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export function ModalCreate({openModal, setOpenModal}) {
  const { createCategory } = useCategories()
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(categorySchema)
  })

  const handleClose = () => {
    setOpenModal(false)
  }

  const onSubmit = handleSubmit((values) => {
    createCategory(values, setOpenModal, reset)
  })

  return (
    <React.Fragment>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ fontWeight: 'bold' }} id="alert-dialog-title">
          Crear Categoría.
        </DialogTitle>
        <DialogContent>
          <DialogContentText component="div" id="alert-dialog-description">
            <form className='flex flex-col gap-8' onSubmit={onSubmit}>
              <Input type='text' placeholder='Nombre' name='name' register={register} errors={errors.name}/>    
              <div className='flex space-x-4'>
                <button className='cursor-pointer text-sm font-semibold text-white rounded-md px-3 py-2 bg-green-500/90'>Enviar</button>
                <button className='cursor-pointer text-sm font-semibold text-white rounded-md px-3 py-2 bg-zinc-500/90' onClick={() => setOpenModal(false)} type='button'>Cancelar</button>
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
