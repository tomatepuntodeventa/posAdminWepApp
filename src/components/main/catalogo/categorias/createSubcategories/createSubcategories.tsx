import { useState } from 'react';
import styles from './createSubcategories.module.css';
import { useDispatch, useSelector } from 'react-redux';
import arrow from '@/assets/public/arrow.svg';
import closeIcon from '@/assets/public/closeIcon.svg';
import disquetIcon from '@/assets/public/disquetIcon.svg';

interface Props {
  openModal: any;
  actionType: () => void;
  loading: any;
  errors: any;
  isOpen: any;
  onClose: any;
  children: any;
}

export default function CreateSubcategories({
  actionType,
  openModal,
  isOpen,
  onClose,
  children,
}: Props) {
  const [toggleStatus, setToggleStatus] = useState(false);
  const [category, setCategory] = useState({});

  const [subCategory, setSubCategory] = useState({
    subCategoryName: '',
    category: category,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubCategory({
      ...subCategory,
      [name]: value,
    });
  };
  const categoriesList = useSelector((state) => state.categories.allCategories);

  const dispatch = useDispatch();

  return (
    <div className={styles.screen}>
      <section className={styles.modal}>
        <div className={styles.headModal}>
          <h3 className={styles.tittle}>{children}</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <img src={closeIcon} alt="close-icon" />
          </button>
        </div>
        <div className={styles.containerInput}>
          <div className={styles.categoriesSelect}>
            <div
              className={styles.customSelect}
              onClick={() => {
                setToggleStatus(!toggleStatus);
              }}
            >
              <div className={styles.selectTrigger}>
                <span>{category.categoryName ?? 'Seleccion'}</span>
                <img src={arrow} alt="" className={styles.arrowSelect} />
              </div>
              <div className={toggleStatus ? styles.options : styles.hidden}>
                {categoriesList.map((element) => (
                  <span
                    className={styles.option}
                    onClick={() => setCategory(element)}
                  >
                    {element.categoryName}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <form className={styles.form}>
          <input
            type="text"
            placeholder="Nombre de la Subcategoria"
            className={styles.input}
            name="subCategoryName"
            onChange={handleChange}
          />
        </form>
        <button
          disabled={!category.categoryName || !subCategory.subCategoryName}
          className={styles.button}
          onClick={() => {
            dispatch(createCategoryAction(category)), openModal(), onClose();
          }}
        >
          <img src={disquetIcon} alt="save-icon" />
          Agregar subcategoria
        </button>
      </section>
    </div>
  );
}
