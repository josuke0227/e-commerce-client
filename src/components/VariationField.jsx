import VariationsForm from "./VariationsForm";
import VariationsTable from "./shared/VariationsTable";
import { useState } from "react";
import VariationEditor from "./VariationEditor";
import { Container } from "@material-ui/core";

const ControlPanel = ({
  variations,
  setVariations,
  totalQty,
  handleVariationSelect,
  currentVariants,
  handleVariationDeSelect,
  setErrors,
  variants,
  setShowVariationDialog,
}) => {
  const [selectedVariation, setSelectedVariation] = useState("");

  const handleEditClick = (variation, i) => {
    const variantNames = Object.keys(variation).filter((k) => k !== "qty");

    const variationData = createVariationDataWithIndex(variantNames, variation);
    variationData.location = i;

    setSelectedVariation(variationData);
  };

  const createVariationDataWithIndex = (variantNames, variation) => {
    let data = {};
    for (let i = 0; i < variantNames.length; i++) {
      const name = variantNames[i];
      const index = getIndexOfInstance(name, variation[name]);
      data = { ...data, [name]: { index } };
    }
    data.qty = variation.qty;
    return data;
  };

  const getIndexOfInstance = (variantName, variationData) => {
    let index;
    const instances = currentVariants.filter((v) => v.name === variantName)[0]
      .instances;
    instances.forEach((i, idx) => {
      if (i.name === variationData.name) index = idx;
    });
    return index;
  };

  const handleDeleteClick = (index) => {
    const current = [...variations];
    current.splice(index, 1);
    setVariations(current);
  };

  const getCount = (arr) => {
    if (!arr.length) return 0;

    let count = 0;
    arr.forEach((v) => (count += parseInt(v.qty)));
    return count;
  };

  return (
    <>
      {selectedVariation && (
        <VariationEditor
          currentVariants={currentVariants}
          variations={variations}
          setVariations={setVariations}
          selectedVariation={selectedVariation}
          setSelectedVariation={setSelectedVariation}
        />
      )}
      <VariationsForm
        variants={variants}
        selectedVariation={selectedVariation}
        variations={variations}
        setVariations={setVariations}
        variationTotalQty={getCount(variations)}
        totalQty={totalQty}
        handleVariationSelect={handleVariationSelect}
        currentVariants={currentVariants}
        handleVariationDeSelect={handleVariationDeSelect}
        setErrors={setErrors}
        setShowVariationDialog={setShowVariationDialog}
      />
      <VariationsTable
        variations={variations}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
    </>
  );
};

export default ControlPanel;
