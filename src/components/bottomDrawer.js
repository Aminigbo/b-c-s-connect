import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
function CustomBottomDrawer({
    Action,
    bottomSheetRef,
    handleSheetChanges,
    renderBackdrop
}) {


    // bottom drawer  snapPoints variables
    const snapPoints = useMemo(() => ['17%', '50%', '95%'], []);

  

    return (
        <BottomSheet
            enablePanDownToClose={true}
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            onChange={handleSheetChanges}
        >

            {Action}

        </BottomSheet>
    )
}

export default CustomBottomDrawer