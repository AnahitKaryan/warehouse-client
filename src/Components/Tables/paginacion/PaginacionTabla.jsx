import React from "react";
import ReactNextPaging from "react-next-paging";

const PaginacionTabla = ({ itemsperpage, nocolumns, items, pagesspan }) => {
    return (
        <ReactNextPaging
          itemsperpage={itemsperpage}
          nocolumns={nocolumns}
          items={items}
          pagesspan={pagesspan}
        >
            {({
                getBackButtonProps,
                getFastBackButtonProps,
                getFwdButtonProps,
                getFastFwdButtonProps,
                getSelPageButtonProps,
                nopages,
                inipagearray,
                pagesforarray,
                currentpage,
                noitems,
                initialitem,
                lastitem,
                goBackBdisabled,
                goFastBackBdisabled,
                goFwdBdisabled,
                goFastFwdBdisabled
            }) => (
            <tbody>
                {items.slice(initialitem, lastitem).map((item, index) => {
                    return item;
                })}
                {noitems > 0
                    ? [
                        <tr key={"pagingrow" + 100}>
                            <td colSpan={nocolumns} style={{ textAlign: "center" }}>
                                <button
                                  className="buttonStyles"
                                  {...getFastBackButtonProps()}
                                  disabled={goFastBackBdisabled}
                                >
                                    {"<<"}
                                </button>
                                <button
                                  className="buttonStyles"
                                  {...getBackButtonProps()}
                                  disabled={goBackBdisabled}
                                >
                                    {"<"}
                                </button>
                                {Array.from(
                                  { length: pagesforarray },
                                  (v, i) => i + inipagearray
                                ).map(page => {
                                    return (
                                        <button
                                          key={page}
                                          {...getSelPageButtonProps({ page: page })}
                                          disabled={currentpage === page}
                                        >
                                            {page}
                                        </button>
                                      );
                                })}
                                <button
                                  className="buttonStyles"
                                  {...getFwdButtonProps()}
                                  disabled={goFwdBdisabled}
                                >
                                    {">"}
                                </button>
                                <button
                                  className="buttonStyles"
                                  {...getFastFwdButtonProps()}
                                  disabled={goFastFwdBdisabled}
                                >
                                    {">>"}
                                </button>
                            </td>
                        </tr>
                      ]
                    : null}
            </tbody>
          )}
        </ReactNextPaging>
    );
};

export { PaginacionTabla };